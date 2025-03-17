## Some items that need attention:  
* implementing the background changer and adding backgrounds
* information and styling to the "references" section
* make page responsive, update for smaller devices

* navigation menu - Solar Arc? A subtle, curved (arc) appears along one edge of the screen (bottom), representing an orbital path. Each menu item (a planet, moon, or waypoint) is positioned along the arc. As users interact, elements dynamically adjust

* iframe triggers. Instead of immediately loading and rendering iframe elements, build out the section with basic data and models. Add a trigger animate the iframe into the scene. 

* performance checker to assist with background objects and resource usage
    const isLowPerformance = navigator.hardwareConcurrency < 4; 
    if (isLowPerformance) {
        createStarfield(scene, { density: 0.5 });
        bloomPass.strength = 1.0;
    }


