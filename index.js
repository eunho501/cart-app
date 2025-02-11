const db = localStorage;
const data = db.getItem("list");
//null= 아무것도 없는값 //object memory
//undefined= 아무것도 없음

// console.log(typeof data);
const newData = JSON.parse(data);
console.log(newData);
console.log(typeof newData);
let list = newData ?? []; //?? 앞에 조건이 만족되지 않을떄 안전빵으로 초기값

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

    const p = document.createElement("p");
    p.innerText = list[i];
    const div = document.createElement("div");

    div.append(p, button);

    const li = document.createElement("li");
    li.append(div);

    ul.append(li);

    //   const tag = `
    //     <li>
    //         <div>
    //             <p>${list[i]}</p>
    //             ${button}
    //         </div>
    //     </li>
    //     `
    //   console.log(tag)
    //   number += i
    //   li += tag
  }
};

rendering();

const form = document.querySelector("form");
const input = document.getElementById("item");

form.addEventListener(
  "submit",

  (event) => {
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

    console.log(db.getItem("item"));
  }
);
