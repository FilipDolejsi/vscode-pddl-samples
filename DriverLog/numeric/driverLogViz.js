const locations = ["bldg0", "bldg1", "lot0", "lot1"]

const drivers = ["driver1"]
const trucks = ["truck1"]
const objects = ["package1"]

const valueMap = new Map([
    ["path lot0 bldg1", true],
    ["at package1 lot1", true],
    ["at driver1 lot1", true],
    ["path lot0 bldg0", true],
    ["path bldg0 lot0", true],
    ["path bldg1 lot1", true],
    ["path lot1 bldg0", true],
    ["path bldg0 lot1", true],
    ["at truck1 lot0", true],
    ["empty truck1", true],
    ["time-to-walk lot0 bldg1", 29],
    ["time-to-walk bldg0 lot0", 43],
    ["time-to-walk lot0 bldg0", 43],
    ["time-to-walk lot1 bldg0", 80],
    ["driven", 48],
    ["time-to-walk lot1 bldg1", 79],
    ["link lot1 lot0", true],
    ["time-to-drive lot1 lot0", 24],
    ["time-to-walk bldg0 lot1", 80],
    ["time-to-walk bldg1 lot1", 79],
    ["walked", 152],
    ["time-to-walk bldg1 lot0", 29],
    ["link lot0 lot1", true],
    ["time-to-drive lot0 lot1", 24]]);

var edgesDrawn = new Map([
])

console.log('hello');

const nodeMap = new Map([
])

// create an array with nodes
var nodes = new vis.DataSet([])
var i;
var counter = 1;
for (i = 0; i < locations.length; i++) {
    nodes.update({ id: counter, label: locations[i] })
    nodeMap.set(locations[i], counter);
    counter++
}
for (i = 0; i < drivers.length; i++) {
    nodes.update({ id: counter, label: drivers[i] })
    nodeMap.set(drivers[i], counter)
    counter++
}
for (i = 0; i < trucks.length; i++) {
    nodes.update({ id: counter, label: trucks[i] })
    nodeMap.set(trucks[i], counter)
    counter++
}
for (i = 0; i < objects.length; i++) {
    nodes.update({ id: counter, label: objects[i] })
    nodeMap.set(objects[i], counter)
    counter++
}

// create an array with edges
let isFound = false
let timeToWalk = "time-to-walk"
let timeToDrive = "time-to-drive"
const label13 = timeToWalk + ": " + valueMap.get(timeToWalk + " " + locations[0] + " " + locations[2]);
console.log(label13)
var edges = new vis.DataSet([]);

function checkIfDuplicateEdge(search, key) {
    if (key.startsWith(search)){
        let i = key.replace(search, "")
        i = i.replace(" ", "")
        for (let key2 of nodeMap.keys()) {
            if (i.startsWith(key2)) {
                for (let key3 of nodeMap.keys()) {
                    if (i.endsWith(key3)) {
                        if (edgesDrawn != null && (edgesDrawn.get(key2) == key3 || edgesDrawn.get(key3) == key2)) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
}

function numberOf(search, key){
    let counter = 0
    let i = key.replace(search, "")
    i = i.replace(" ", "")
    for(let key44 of valueMap.keys()){
        if(key44.startsWith(search)){
            let newKey = key44.replace(search, "")
            newKey = newKey.replace(" ", "")
            for (let loc of locations){
                if(i.startsWith(loc)){
                    key2 = loc
                }
                if(i.endsWith(loc)){
                    key3 = loc
                }
            }
            if((newKey.startsWith(key2) && newKey.endsWith(key3)) || (newKey.startsWith(key3) && newKey.endsWith(key2))){
                counter++
            }
        }
    }
    return counter
}

            for (let key of valueMap.keys()) {

                if(key.startsWith("link")){
                    if(!checkIfDuplicateEdge("link", key)){
                        let key2 = ""
                        let key3 = ""
                        let i = key.replace("link", "")
                        i = i.replace(" ", "")
                        let keyValue = valueMap.get(key)
                        for (let loc of locations){
                            if(i.startsWith(loc)){
                                key2 = loc
                            }
                            if(i.endsWith(loc)){
                                key3 = loc
                            }
                        }
                        for (let keys of valueMap.keys()){
                            if (keys.startsWith(timeToDrive)){
                                let a = keys.replace(timeToDrive, "")
                                a = a.replace(" ", "")
                                if((a.startsWith(i) && a.endsWith(i))){
                                    keyValue = valueMap.get(keys)
                                }
                            }
                            else if (keys.startsWith(timeToWalk)){
                                let a = keys.replace(timeToWalk, "")
                                a = a.replace(" ", "")
                                if(a.startsWith(i) && a.endsWith(i)){
                                    keyValue = valueMap.get(keys)
                                }
                            }
                        }
                        if(numberOf("link", key) > 1){
                            edges.update({ from: nodeMap.get(key2), to: nodeMap.get(key3), arrows: "to, from", label: "link: " + keyValue, font: { align: "horizontal" }})
                            edgesDrawn.set(key2, key3)
                        }
                        else if (numberOf("link", key) == 1){
                            edges.update({ from: nodeMap.get(key2), to: nodeMap.get(key3), arrows: "to", label: "link: " + keyValue, font: { align: "horizontal" }})
                            edgesDrawn.set(key2, key3)
                        }
                    }
                }

                if(key.startsWith("path")){
                    if(!checkIfDuplicateEdge("path", key)){
                        let key2 = ""
                        let key3 = ""
                        let i = key.replace("path", "")
                        i = i.replace(" ", "")
                        let keyValue = valueMap.get(key)
                        for (let loc of locations){
                            if(i.startsWith(loc)){
                                key2 = loc
                            }
                            if(i.endsWith(loc)){
                                key3 = loc
                            }
                        }
                        for (let keys of valueMap.keys()){
                            if (keys.startsWith(timeToDrive)){
                                let a = keys.replace(timeToDrive, "")
                                a = a.replace(" ", "")
                                if((a.startsWith(i) && a.endsWith(i))){
                                    keyValue = valueMap.get(keys)
                                }
                            }
                            else if (keys.startsWith(timeToWalk)){
                                let a = keys.replace(timeToWalk, "")
                                a = a.replace(" ", "")
                                if(a.startsWith(i) && a.endsWith(i)){
                                    keyValue = valueMap.get(keys)
                                }
                            }
                        }
                        if(numberOf("path", key) > 1){
                            edges.update({ from: nodeMap.get(key2), to: nodeMap.get(key3), arrows: "to, from", label: "path: " + keyValue, font: { align: "horizontal" }, dashes: true})
                            edgesDrawn.set(key2, key3)
                        }
                        else if (numberOf("path", key) == 1){
                            edges.update({ from: nodeMap.get(key2), to: nodeMap.get(key3), arrows: "to", label: "path: " + keyValue, font: { align: "horizontal" }, dashes: true})
                            edgesDrawn.set(key2, key3)
                        }
                    }
                }
                
                if(key.startsWith("at")){
                    i = key.replace("at ", "")
                    let key2 = ""
                    let key3 = ""
                    for (let node of nodeMap.keys()){
                        if(i.startsWith(node)){
                            key2 = nodeMap.get(node)
                        }
                        if(i.endsWith(node)){
                            key3 = nodeMap.get(node)
                        }
                    }
                    edges.update({ from: key2, to: key3, arrows: "to", label: "at", font: { align: "horizontal" }})
                }



//                 if (key.startsWith("link")) {
//                     let i = key.replace("link")
//                     i = i.replace(" ", "")
//                 }
// let rightTime = 0
//                 if (key.startsWith("path")) {
//                     let i = key.replace("path ", "")
//                     i = i.replace(" ", "")
//                     for (let key2 of nodeMap.keys()) {
//                         if(i.startsWith(key2)){
//                         for (let key3 of nodeMap.keys()) {
//                             if(i.endsWith(key3)){
//                             if (edgesDrawn.get(key2) == key3 || edgesDrawn.get(key3) == key2) {
//                                 continue
//                             }
//                             else {
//                                 for (let timeKey of valueMap.keys()) {
//                                     if (timeKey.startsWith(timeToDrive) || timeKey.startsWith(timeToWalk)) {
//                                         let location = timeKey.replace(timeToWalk, "")
//                                         location = location.replace(" ", "")
//                                         if (location.startsWith(key2) && location.endsWith(key3)) {
//                                             rightTime = timeKey
//                                             continue
//                                         }
//                                     }
//                                 }
//                                 edges.update({ from: nodeMap.get(key2), to: nodeMap.get(key3), arrows: "to, from", label: "path: " + valueMap.get(rightTime), font: { align: "horizontal" }, dashes: true })
//                                 edgesDrawn.set(key2, key3)
//                             }
//                             }
//                         }
//                         }
//                     }
//                 }
//                 else if (key.startsWith("at")) {
//                     let i = key.replace("at ", "")
//                     i = i.replace(" ", "")
//                     for (let key2 of nodeMap.keys()) {
//                         if (i.startsWith(key2)) {
//                             for (let key3 of nodeMap.keys()) {
//                                 if (i.endsWith(key3)) {
//                                     if (edgesDrawn.get(key2) == key3 || edgesDrawn.get(key3) == key2) {
//                                         continue
//                                     }
//                                     else {
//                                         edges.update({ from: nodeMap.get(key2), to: nodeMap.get(key3), arrows: "to", label: "at", font: { align: "horizontal" } })
//                                         edgesDrawn.set(key2, key3)
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//                 else if (key.startsWith("empty")) {
//                 }

//                 // else if(key.startsWith(timeToWalk||timeToDrive)){
//                 //     let key2a = ""
//                 //     let key3a = ""
//                 //     let i = key.replace(timeToWalk,"")
//                 //     i = i.replace(" ","")
//                 //     for (let key2 of nodeMap.keys()){
//                 //         if(i.startsWith(key2)){
//                 //             for (let key3 of nodeMap.keys()){
//                 //                 if(i.endsWith(key3)){
//                 //                     key2a = key2
//                 //                     key3a = key3
//                 //                     if (edgesDrawn.get(key2) == key3 || edgesDrawn.get(key3) == key2){
//                 //                         continue
//                 //                     }
//                 //                     else{
//                 //                         for (let timeKey of valueMap.keys()){
//                 //                             if(timeKey.startsWith(timeToDrive)||timeKey.startsWith(timeToWalk)){
//                 //                                 let location = timeKey.replace(timeToWalk,"")
//                 //                                 location = location.replace(" ","")
//                 //                                     if(location.startsWith(key2) && location.endsWith(key3)){
//                 //                                         rightTime = timeKey
//                 //                                         continue
//                 //                                 }
//                 //                             }
//                 //                         }
//                 //                         edges.update({ from: nodeMap.get(key2), to: nodeMap.get(key3), arrows: "to, from", label: "path: "+valueMap.get(rightTime), font: { align: "horizontal" }, dashes: true})
//                 //                         edgesDrawn.set(key2, key3)
//                 //                     }
//                 //                 }
//                 //             }
//                 //         }
//                 //     }
//                 // }
                // else if (key.startsWith("walked")) {
                // }
                // else if (key.startsWith("driven")) {
                // }
            }

            console.log(nodeMap);
            // create a network
            var container = document.getElementById("mynetwork")
            var data = {
                nodes: nodes,
                edges: edges,
            };
            var options = {};
            var network = new vis.Network(container, data, options)