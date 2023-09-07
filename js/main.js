// get 'top'-button
btn = document.getElementById("top-button");
window.onscroll = function () {
    onScrolling()
};

// setup for table of contents
setupTOC();
modifyEntryElements();

function onScrolling() {
    if (document.body.scrollTop > 240 || document.documentElement.scrollTop > 240) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function gotoTop() {
    document.body.scrollTop = 0; //Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
}

// creating table of contents
function setupTOC() {
    let div = document.getElementById('navigation');
    createHeading(div);
    const categoryList = createObject("ul", div, "id", "categoryList");
    categoryList.classList.add("row");

    // get categories
    let categories = document.getElementsByClassName('category');
    for (const current of categories ) {
        let categoryName = current.getElementsByClassName('heading')[0].innerHTML;
        let name = categoryName.toLowerCase();

        let col = createObject("div", categoryList, "class", "col-12 col-md-6 col-lg-3");

        // generation of lists and sub categories
        let category = createObject("h3", col, "id", "li-" + name);
        // category.classList.add("bg-primary");

        let title = createObject("a", category, "href", "#" + name);
        title.innerHTML = categoryName;

        let itemList = createObject("ul", col, "id", "ul-" + name);

        let div = current.getElementsByClassName('list')[0];
        let subs = div.getElementsByTagName('h3');
        let ids = generateHeadingIds(div, subs, name);

        let titles = [];

        for (const sub of subs) {
            titles.push(sub.innerHTML);
        }

        for (let itemIndex = 0; itemIndex < ids.length; itemIndex++) {
            let li = createObject("li", itemList, "class", itemIndex);
            let a = createObject("a", li, "href", "#" + ids[itemIndex]);
            a.innerHTML = titles[itemIndex];

            li.appendChild(a);
            itemList.appendChild(li);
        }
        col.appendChild(itemList);
    }
}

function modifyEntryElements() {
    const subs = document.getElementsByClassName('sub');
    console.log(subs.length);

    // for (let entry = 0; entry < subs.length; entry++) 
    for (const sub of subs) {
        let classname = sub.className,
            elements;

        if (classname == "sub top-10") {
            elements = sub.getElementsByTagName('LI');
        } else {
            elements = sub.getElementsByTagName('P');
        }

        for (let i = 0; i < elements.length; i++) {
            let content = elements[i].innerHTML;
            let link = "https://www.google.com/search?q=" + content;
            elements[i].innerHTML = '<a target="_blank" href="' + link + '">' + content + "<a/>";
        }
    }

}

function createHeading(parent) {
    const heading = document.createElement("h2");
    heading.innerHTML = "Table of contents:";
    parent.appendChild(heading);
}

function createObject(type, parent, tag, tagValue) {
    let object = document.createElement(type);
    object.setAttribute(tag, tagValue);
    parent.appendChild(object);

    return object;
}

function generateHeadingIds(parent, headings, name) {
    let subs = parent.getElementsByClassName('sub');
    let ids = [];

    for (let i = 0; i < subs.length; i++) {
        let text = headings[i].innerHTML;
        text = text.split(" ")[0].toLowerCase();

        headings[i].setAttribute("id", name + "-" + text);
        ids.push(headings[i].getAttribute("id"));
    }
    return ids;
}