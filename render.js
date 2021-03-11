/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Spencer Jones
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {
    // TODO: Copy your code from a04 to render the hero card
    let card = document.createElement("div");
    card.className = "card";
    card.id = hero.id;

    card.style.backgroundColor = hero.backgroundColor;

    let image = document.createElement("img");
    image.src = hero.img;
    image.alt = "Hero";
    image.style.width = "100%";

    let container = document.createElement("div");
    container.className = "container";
    container.backgroundColor = "white";

    let subtitle = document.createElement("span");
    subtitle.innerHTML = '\"' + hero.subtitle + '\"';

    let alt_header = document.createElement("h4");
    alt_header.innerHTML = "Alter ego: "

    let alter_ego = document.createElement("b");
    alter_ego.innerHTML = hero.first + " " + hero.last;

    alt_header.appendChild(alter_ego);

    let first_header = document.createElement("h4");
    first_header.innerHTML = "First appearance: ";

    let first_appearance = document.createElement("b");
    first_appearance.innerHTML = hero.firstSeen;

    first_header.appendChild(first_appearance);

    let hero_name = document.createElement("p");
    hero_name.innerHTML = hero.name;
    hero_name.className = "hero-name";
    hero_name.style.color = hero.color;

    let hero_description = document.createElement("p");
    hero_description.innerHTML = hero.description;

    let edit_button = document.createElement("button");
    edit_button.className = "edit-button";
    edit_button.id = "edit-button";
    edit_button.innerHTML = "Edit";
    edit_button.addEventListener("click", handleEditButtonPress);

    container.appendChild(subtitle);
    container.appendChild(alt_header);
    container.appendChild(first_appearance);
    container.appendChild(hero_description);
    container.appendChild(edit_button);

    card.appendChild(image);
    card.appendChild(hero_name);
    card.appendChild(container);

    return card;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    if (hero == undefined) {
        return null;
    }
    let br = document.createElement("br");

    let form = document.createElement("form");
    form.className = "form";
    form.id = hero.id;

    let hero_label = document.createElement("label");
    hero_label.setAttribute("for", "hero-name");
    hero_label.innerHTML = "Hero Name";

    let hero_input = document.createElement("input");
    hero_input.className = "hero-name";
    hero_input.type = "text";
    hero_input.name = "hero-name";
    hero_input.value = hero.name;

    let first_label = document.createElement("label");
    first_label.setAttribute("for", "first-name");
    first_label.innerHTML = "First Name";

    let first_input = document.createElement("input");
    first_input.className = "first-name";
    first_input.type = "text";
    first_input.name = "first-name";
    first_input.value = hero.first;

    let last_label = document.createElement("label");
    last_label.setAttribute("for", "last-name");
    last_label.innerHTML = "Last Name";

    let last_input = document.createElement("input");
    last_input.className = "last-name";
    last_input.type = "text";
    last_input.name = "last-name";
    last_input.value = hero.last;

    let subtitle_label = document.createElement("label");
    subtitle_label.setAttribute("for", "subtitle");
    subtitle_label.innerHTML = "Subtitle";

    let subtitle_input = document.createElement("input");
    subtitle_input.className = "subtitle";
    subtitle_input.type = "text";
    subtitle_input.name = "subtitle";
    subtitle_input.value = hero.subtitle;

    let description_label = document.createElement("label");
    description_label.setAttribute("for", "description");
    description_label.innerHTML = "Description";

    let description_input = document.createElement("textarea");
    description_input.className = "description";
    description_input.name = "description";
    description_input.value = hero.description;

    let date_label = document.createElement("label");
    date_label.setAttribute("for", "date");
    date_label.innerHTML = "First appearance";

    let date_input = document.createElement("input");
    date_input.className = "date";
    date_input.type = "date";
    date_input.name = "date";
    date_input.value = formatDate(hero.firstSeen);

    let cancel_button = document.createElement("button");
    cancel_button.className = "cancel-button";
    cancel_button.id = "cancel-button";
    cancel_button.innerHTML = "Cancel";
    cancel_button.addEventListener("click", handleCancelButtonPress);

    let save_button = document.createElement("button");
    save_button.className = "save-button"
    save_button.type = "submit";
    save_button.id = "save-button";
    save_button.innerHTML = "Save";
    save_button.addEventListener("click", handleEditFormSubmit);

    form.appendChild(hero_label);
    form.appendChild(br);
    form.appendChild(hero_input);
    form.appendChild(br);
    form.appendChild(first_label);
    form.appendChild(br);
    form.appendChild(first_input);
    form.appendChild(br);
    form.appendChild(last_label);
    form.appendChild(br);
    form.appendChild(last_input);
    form.appendChild(br);
    form.appendChild(subtitle_label);
    form.appendChild(br);
    form.appendChild(subtitle_input);
    form.appendChild(br);
    form.appendChild(description_label);
    form.appendChild(br);
    form.appendChild(description_input);
    form.appendChild(br);
    form.appendChild(date_label);
    form.appendChild(br);
    form.appendChild(date_input);
    form.appendChild(br);
    form.appendChild(cancel_button);
    form.appendChild(save_button);

    return form;
};

export const formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate()),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let target = event.target;
    let card = target.parentNode.parentNode;
    let id = card.id;
    for (let i = 0; i < heroicData.length; i++) {
        if (id == heroicData[i].id) {
            let form = renderHeroEditForm(heroicData[i]);
            card.after(form);
            card.remove();
        }
    }
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    event.preventDefault();
    let target = event.target;
    let form = target.parentNode;
    let id = form.id
    let hero;
    for (let i = 0; i < heroicData.length; i++) {
        if (id == heroicData[i].id) {
            hero = heroicData[i];
            break;
        }
    }
    let card = renderHeroCard(hero);
    form.after(card);
    form.remove();
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    let target = event.target;
    let form = target.parentNode;
    let id = form.id;

    let name = form.querySelector('.hero-name').value;
    let first = form.querySelector('.first-name').value;
    let last = form.querySelector('.last-name').value;
    let subtitle = form.querySelector('.subtitle').value;
    let description = form.querySelector('.description').value;
    let date = form.querySelector('.date').value;
    let new_date = parseDate(date);

    let hero;
    for (let i = 0; i < heroicData.length; i++) {
        if (id == heroicData[i].id) {
            heroicData[i].name = name;
            heroicData[i].first = first;
            heroicData[i].last = last;
            heroicData[i].subtitle = subtitle;
            heroicData[i].description = description;
            heroicData[i].firstSeen = new_date;
            hero = heroicData[i];
            break;
        }
    }

    let card = renderHeroCard(hero);
    form.after(card);
    form.remove();
};

let parseDate = function (input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
}



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    let arr = [];
    for (let i = 0; i < heroes.length; i++) {
        let tempCard = renderHeroCard(heroes[i]);
        // TODO: Append the hero cards to the root element
        // NOTE: Copy your code from a04 for this part
        $('#root').append(tempCard);
    }

    return root;
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});