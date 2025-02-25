## Some items that need attention:  
* navigation menu
* mouse wheel indicator to show users to scroll pages
* implementing the background changer and adding backgrounds
* find a better Psyche model? 
* determine if interactive games can be loaded into the scene and still interactive
* information and styling to the "references" section
* The page is not responsive at all. 

* performance checker to assist with background objects and resource usage
    const isLowPerformance = navigator.hardwareConcurrency < 4; // e.g., fewer cores
    if (isLowPerformance) {
        createStarfield(scene, { density: 0.5 });
        bloomPass.strength = 1.0;
    }