"use strict";
console.log("유돼지");
const root = document.getElementById('root');
console.log(root);
const btn = document.createElement('button');
btn.innerText = "이것을 누르면 동적인 파일인 생성이 된다.";
btn.id = "btn";
root === null || root === void 0 ? void 0 : root.appendChild(btn);
btn.addEventListener('click', function () {
    console.log('돼지');
    location.href = "/mkFileJs";
});
