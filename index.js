const db = localStorage;
const data = db.getItem("list");
const newData = JSON.parse(data);
let list = newData ?? [];

const rendering = () => {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  list.forEach((item, i) => {
    const button = document.createElement("button");
    button.innerText = "삭제";
    button.onclick = () => {
      list.splice(i, 1);
      db.setItem("list", JSON.stringify(list)); // 로컬 스토리지 업데이트
      rendering();
    };

    const p = document.createElement("p");
    p.innerText = item;
    const div = document.createElement("div");

    let isEditing = false;
    const cancel = document.createElement("button");
    const confirm = document.createElement("button");
    cancel.innerText = "취소";
    confirm.innerText = "수정";

    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.columnGap = "10px";

    cancel.addEventListener("click", () => {
      isEditing = false;
      div.innerHTML = "";
      div.append(p, button);
    });

    confirm.addEventListener("click", () => {
      list[i] = newInput.value;
      db.setItem("list", JSON.stringify(list)); // 로컬 스토리지 업데이트
      isEditing = false;
      rendering();
      alert("수정되었습니다.");
    });

    const newInput = document.createElement("input");
    newInput.value = item; // 기존 값 유지
    wrap.append(confirm, cancel);

    div.addEventListener("click", () => {
      if (isEditing) return;
      isEditing = true;
      div.innerHTML = "";
      div.append(newInput, wrap);
    });

    div.append(p, button);

    const li = document.createElement("li");
    li.append(div);
    ul.append(li);
  });
};

rendering();

const form = document.querySelector("form");
const input = document.getElementById("item");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = input.value;
  if (item.length === 0) {
    alert("장 볼 물건을 입력해주세요.");
    return input.focus();
  }
  list.unshift(item);
  db.setItem("list", JSON.stringify(list)); // 로컬 스토리지 업데이트
  rendering();
  input.value = "";
});
