const ul = document.getElementById("keywords_ul"),
    input = document.getElementById("keywords"),
    new_keywords = document.getElementById("new_keywords"),

    tagNumb = document.querySelector(".details span");

let maxTags = 1000,
    tags = [];

countTags();
createTag();

function countTags() {
    input.focus();
    tagNumb.innerText =  maxTags - tags.length;
    new_keywords.value = tags;

}

function createTag() {
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
    countTags();
}

function remove(element, tag) {
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    new_keywords.value = tags;

    element.parentElement.remove();
    countTags();
}

function addTag(e) {
    if (e.key == "Enter") {
        let tag = e.target.value.replace(/\s+/g, ' ');
        if (tag.length > 1 && !tags.includes(tag)) {
            if (tags.length < 10) {
                tag.split(',').forEach(tag => {
                    tags.push(tag);
                    new_keywords.value = tags + ',';
                    createTag();

                });
            }
        }
        e.target.value = "";
    }
}

input.addEventListener("keyup", addTag);

const removeBtn = document.querySelector(".details button");
removeBtn.addEventListener("click", () => {
    tags.length = 0;
    new_keywords.value = tags;

    ul.querySelectorAll("li").forEach(li => li.remove());
    countTags();
});
