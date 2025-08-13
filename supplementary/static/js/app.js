// https://github.com/reconfusion/reconfusion.github.io/blob/main/js/app.js
// JavaScript to handle mouseover and mouseout events

var activeMethodPill = null;
var activeScenePill = null;
var sceneForMethod = {
    "age_regression": "al",
    "age_progression": "al"
} // Default scenes for each method

$(document).ready(function () {
    // Initialize both sections
    initializeSection('regression');
    initializeSection('progression');
});

function initializeSection(type) {
    // Add slider event listener
    $(`#${type}Slider`).on('input', function() {
        updateImages(type);
    });

    // Set initial active thumbnail
    $(`#scene-pills-age-${type} .scene-pill`).first().addClass('active');
    
    // Add click handlers to thumbnails
    $(`#scene-pills-age-${type} .scene-pill`).click(function() {
        $(`#scene-pills-age-${type} .scene-pill`).removeClass('active');
        $(this).addClass('active');
        updateImages(type);
    });

    // Initial load
    updateImages(type);
}

function updateImages(type) {
    const scene = $(`#scene-pills-age-${type} .scene-pill.active`).attr('data-value');
    const targetAge = String($(`#${type}Slider`).val() * 10).padStart(2, '0');
    const method = `age_${type}`;

    const basePath = `results/comparisons/${method}/${scene}/`;
    
    $(`#${type}SourceImage`).attr('src', `${basePath}source.jpeg`);
    $(`#${type}ReferenceImage`).attr('src', `${basePath}reference/${targetAge}.jpeg`);
    $(`#${type}OursImage`).attr('src', `${basePath}ours/${targetAge}.jpeg`);
    $(`#${type}SamImage`).attr('src', `${basePath}sam/${targetAge}.jpeg`);
    $(`#${type}FadingImage`).attr('src', `${basePath}fading/${targetAge}.jpeg`);
}

function selectCompMedia(methodPill, scenePill) {
    // Remove the active class only from pills in the same section
    const method = methodPill.getAttribute("data-value"); // age_regression or age_progression
    $(`#scene-pills-${method} .scene-pill`).removeClass("active");
    $('.method-pill').removeClass("active");

    // Add the active class to the clicked pills
    activeMethodPill = methodPill;
    activeScenePill = scenePill;
    methodPill.classList.add("active");
    scenePill.classList.add("active");

    // Get the data attributes
    const scene = scenePill.getAttribute("data-value");
    const targetAge = String($('#sparsitySlider').val() * 10).padStart(2, '0');

    // Update the "Ours" label based on the method
    const oursLabel = method === 'age_regression' ? 'Ours (30~70)' : 'Ours (20~40)';
    $(`#${method}OursImage`).parent().next('div').text(oursLabel);
    
    // Update the "Source" label based on the method
    const sourceLabel = method === 'age_regression' ? 'Source ~70 years old' : 'Source ~40 years old';
    $(`#${method}SourceImage`).parent().next('div').text(sourceLabel);
    
    const basePath = `results/comparisons/${method}/${scene}/`;
    
    // Update the image sources for the specific section
    $(`#${method}SourceImage`).attr('src', `${basePath}source.jpeg`);
    $(`#${method}ReferenceImage`).attr('src', `${basePath}reference/${targetAge}.jpeg`);
    $(`#${method}OursImage`).attr('src', `${basePath}ours/${targetAge}.jpeg`);
    $(`#${method}SamImage`).attr('src', `${basePath}sam/${targetAge}.jpeg`);
    $(`#${method}FadingImage`).attr('src', `${basePath}fading/${targetAge}.jpeg`);

    // Remember selected scene for the method
    sceneForMethod[method] = scene;
}

// Function to toggle scene pills based on the selected method
function toggleScenePills(method) {
    $('#scene-pills-age-regression').toggle(method === 'age_regression');
    $('#scene-pills-age-progression').toggle(method === 'age_progression');
}

// Function to switch between age regression and age progression methods
function switchMethod(methodPill) {
    var method = methodPill.getAttribute("data-value");
    toggleScenePills(method); // Toggle visibility of scene pills
    
    // Select the active scene pill for the selected method and add the active class
    var activeScenePill = $('.scene-pill[data-value="' + sceneForMethod[method] + '"]')[0];
    // console.log('Active Scene Pill:', activeScenePill);

    $(activeScenePill).addClass('active');


    selectCompMedia(methodPill, activeScenePill);
}
