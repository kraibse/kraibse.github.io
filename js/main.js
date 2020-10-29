// get 'top'-button
btn = document.getElementById("top-button");
window.onscroll = function() {onScrolling()};

// setup for table of contents
setupTOC();
modifyEntryElements();

function onScrolling()
{
    if (document.body.scrollTop > 240 || document.documentElement.scrollTop > 240) {
        btn.style.display = "block";
    }
    else {
        btn.style.display = "none";
    }
}

function gotoTop()
{
    document.body.scrollTop = 0; //Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
}

// creating table of contents
function setupTOC()
{
    var div = document.getElementById('navigation');
    createHeading(div);
    var categoryList = createObject("ul", div, "id", "categoryList");

    // get categories
    var categories = document.getElementsByClassName('container main');
    for (var i = 0; i < categories.length; i++)
    {
        // name and id creation
        var current = categories[i];
        var categoryName = current.getElementsByClassName('heading')[0].innerHTML;
        var name = categoryName.toLowerCase();

        // generation of lists and sub categories
        var category = createObject("li", categoryList, "id", "li-" + name);
        var title = createObject("a", category, "href", "#" + name);
        title.innerHTML = categoryName;

        var itemList = createObject("ul", category, "id", "ul-" + name);

        var div = current.getElementsByClassName('list')[0];
        var subs = div.getElementsByTagName('h3');
        var ids = generateHeadingIds(div, subs, name);

        var titles = [];
        for (j = 0; j < subs.length; j++)
        {
            titles.push(subs[j].innerHTML);
        }

        for (var itemIndex = 0; itemIndex < ids.length; itemIndex++)
        {
            var li = createObject("li", itemList, "class", itemIndex);
            var a = createObject("a", li, "href", "#" + ids[itemIndex]);
            a.innerHTML = titles[itemIndex];

            li.appendChild(a);
            itemList.appendChild(li);
        }
        categoryList.appendChild(itemList);
    }
}

function modifyEntryElements()
{
    subs = document.getElementsByClassName('sub');
    console.log(subs.length);

    for (var entry = 0; entry < subs.length; entry++)
    {
        var classname = subs[entry].className;
        if (classname == "sub top-10")
        {
            var elements = subs[entry].getElementsByTagName('LI');
        }
        else
        {
            var elements = subs[entry].getElementsByTagName('P');
        }

        for (let i = 0; i < elements.length; i++)
        {
            var content = elements[i].innerHTML;
            var link = "https://www.google.com/search?q=" + content;
            elements[i].innerHTML = '<a target="_blank" href="' + link + '">' + content + "<a/>";
        }
    }

}

function createHeading(parent)
{
    var heading = document.createElement("h2");
    heading.innerHTML = "Table of contents:";
    parent.appendChild(heading);
}

function createObject(type, parent, tag, tagValue)
{
    var object = document.createElement(type);
    object.setAttribute(tag, tagValue);
    parent.appendChild(object);

    return object;
}

function generateHeadingIds(parent, headings, name)
{
    var subs = parent.getElementsByClassName('sub');
    var ids = [];

    for (var i = 0; i < subs.length; i++)
    {
        var text = headings[i].innerHTML;
        text = text.split(" ")[0].toLowerCase();

        headings[i].setAttribute("id", name + "-" + text);
        ids.push(headings[i].getAttribute("id"));
    }
    return ids;
}
