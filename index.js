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
const db = localStorage;
const data = db.getItem("list");
// null = 아무것도 없는 값 // object memory
// undefined = 아무것도 없음
const newData = JSON.parse(data);
let list = newData ?? []; // ?? 앞에 조건이 만족되지 않을 때 안전빵으로 출 초기값
const rendering = () => {
  const ul = document.querySelector("ul");
  ul.innerHTML = null;
  for (
    let i = 0;
    i < list.length;
    i = i + 1 // i += 1 // i++
  ) {
    const button = document.createElement("button");
    button.innerText = "삭제";
    button.onclick = () => {
      list.splice(i, 1);
      rendering();
    };
    const edit = document.createElement("button");
    edit.innerText = "수정";
    edit.onclick = () => {
      console.log("수정 시작");
      div.innerHTML = null;
      const confirm = document.createElement("button");
      const cancel = document.createElement("button");
      confirm.innerText = "수정";
      cancel.innerText = "취소";
      const ni = document.createElement("input");
      ni.style.flex = 1;
      ni.style.border = "none";
      ni.style.borderBottom = "1px solid";
      ni.style.outline = "none";
      cancel.onclick = () => {
        console.log("취소 ㄱㄱ");
        div.innerHTML = null;
        div.append(p, edit, button);
      };
      confirm.onclick = () => {
        const nv = ni.value;
        if (nv.length === 0) {
          alert("아무것도 입력되지 않았습니다.");
          return ni.focus();
        }
        if (nv === list[i]) {
          alert("변경사항이 없습니다.");
          return ni.focus();
        }
        list[i] = nv;
        alert("수정되었습니다.");
        div.innerHTML = null;
        div.append(p, edit, button);
        db.setItem("list", JSON.stringify(list));
        rendering();
      };
      div.append(ni, confirm, cancel);
      ni.focus();
      ni.value = list[i];
    };
    const p = document.createElement("p");
    p.innerText = list[i];
    const div = document.createElement("div");
    let isEditing = false;
    div.append(p, edit, button);
    const li = document.createElement("li");
    li.append(div);
    ul.append(li);
  }
};
rendering();
const form = document.querySelector("form");
const input = document.getElementById("item");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // 새로고침 방지 // form 태그 한정
  const item = input.value;
  if (item.length === 0) {
    alert("장 볼 물건을 입력해주세요.");
    return input.focus();
  }
  // list.push()
  list.unshift(item);
  console.log(list);
  db.setItem("list", JSON.stringify(list));
  rendering();
  input.value = "";
});
