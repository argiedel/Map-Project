function setupMapData(list1){
    var latitude = [];
    var longitude = [];
    var txt = [];
    for (var i of list1){
        latitude.push(i[0]);
        longitude.push(i[1]);
        txt.push(i[2]);
    }
    var data = [{
    type:'scattermapbox',
    lat:latitude,
    lon:longitude,
    mode:'markers',
    marker: {
    size:5,
    color: 'rgb(255,0,0)'
  },
    text: txt
}];
return data;
}


function findCenter(list1){
    var arr_lat =[];
    var arr_lon = [];
    var final_arr = [];
    for (var i of list1){
        arr_lat.push(i[0]);
        arr_lon.push(i[1]);
    }
    var max_lon = Math.max.apply(Math,arr_lon);
    var max_lat = Math.max.apply(Math,arr_lat);
    var min_lat = Math.min.apply(Math,arr_lat);
    var min_lon = Math.min. apply(Math,arr_lon);
    var final_lat = (min_lat + max_lat) / 2;
    var final_lon = (min_lon+max_lon) / 2;
    final_arr.push(final_lat);
    final_arr.push(final_lon);
    return final_arr;
}


function setupMapLayout(list1){
    var center_coord = findCenter(list1);
    var center_obj = {lat:center_coord[0],lon:center_coord[1]};
    var layout = {
    autosize: true,
    hovermode:'closest',
    mapbox: {
    bearing:0,
    center: center_obj,
    pitch:0,
    zoom:11,
    style: 'satellite-streets'
  },
};
return layout;
}


function getMapParams(j_string){
    var js_arr = JSON.parse(j_string);
    var layout = setupMapLayout(js_arr);
    var data = setupMapData(js_arr);
    return {data:data, layout:layout};

}

function loadMap(){
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiYXJnaWVkZWwiLCJhIjoiY2pvN3Iwb3lrMHllbDNxczFjejU0N2MzMiJ9.RUtWszz6MhkntqVX38HSAQ'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send();
}