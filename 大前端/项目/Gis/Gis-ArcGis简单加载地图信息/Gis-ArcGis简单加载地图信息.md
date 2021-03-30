Gis-ArcGis�򵥼��ص�ͼ��Ϣ Ŀ¼
[TOC]
***

# ǰ��

- `GIS`��ʶ��ʹ��`ArcGis`�ṩ�Ľӿڣ�`ArcGIS API for JavaScript`
- ʹ�÷�����
  - ����`css, js`
  - ������ʾ
  - `js`����ʵ��

# �Ƽ��Ķ�

- [ArcGiS API for Js](https://developers.arcgis.com/javascript/latest/add-a-point-line-and-polygon/ "�ٷ�doc")

# ���չʾ

![image-20210329190354333](image-20210329190354333.png)

![image-20210329190727361](image-20210329190727361.png)

# ����

## `idnex.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <title>ArcGIS API for JavaScript 4.18</title>
    <style>
      html,
      body,
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
    </style>

    <link rel="stylesheet" href="https://js.arcgis.com/4.18/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.18/"></script>

    <script>
        // ����ʹ�õķ������Ƚ�����Ҫ��ģ�鵼�룬����ʹ����Map��MapView�����������˵���ģ��Ĳ�����
      require(["esri/Map", "esri/views/MapView"], function(Map, MapView) {
        //�������½�һ����ͼ������һЩ��ͼ����
        var map = new Map({
            //���û���ͼ�����Ի������ǹٷ��ĵ�ͼ���Լ�����Ŀ����Ҫ�����Լ��ĵ�ͼ����
          basemap: "topo-vector"
        });

         //�½���ͼ���õ���MapView����2D�ģ�3D��Ҫ��SceneViewģ�飬SceneView��������
        var view = new MapView({
          //��ʾ��HTML�ϵ�����Ҳ�����ĸ�div��
          //����ͼ������ص���ͼ�ϣ�����4.x�汾�趨��3.x�汾��ֱ�Ӵ���mapʱ�趨������Ҫviewģ�顣
          container: "viewDiv",
          map: map,
          //���ü��ص�ͼ�����ŵȼ�������λ�á�
          zoom: 4,
          center: [15, 65] // longitude, latitude
        });
      });
    </script>
  </head>

  <body>
    <div id="viewDiv"></div>
  </body>
</html>

```

## `index2.html`

```js
<html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
      <title>ArcGIS API for JavaScript Tutorials: Add a point, line, and polygon</title>
      <style>
        html, body, #viewDiv {
          padding: 0;
          margin: 0;
          height: 100%;
          width: 100%;
        }
      </style>
      <link rel="stylesheet" href="https://js.arcgis.com/4.18/esri/themes/light/main.css">
      <script src="https://js.arcgis.com/4.18/"></script>
      <script>
    
      require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
    
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
    
        ], function(esriConfig,Map, MapView, Graphic, GraphicsLayer) {
    
      esriConfig.apiKey = "YOUR-API-KEY";
    
      const map = new Map({
        basemap: "arcgis-topographic" //Basemap layer service
      });
    
      const view = new MapView({
        map: map,
        center: [-118.80500,34.02700], //Longitude, latitude
        zoom: 13,
        container: "viewDiv"
     });
    
     const graphicsLayer = new GraphicsLayer();
     map.add(graphicsLayer);
    
     const point = { //Create a point
        type: "point",
        longitude: -118.80657463861,
        latitude: 34.0005930608889
     };
     const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
     };
    
     const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
     });
     graphicsLayer.add(pointGraphic);
    
        // Create a line geometry
     const polyline = {
        type: "polyline",
        paths: [
            [-118.821527826096, 34.0139576938577], //Longitude, latitude
            [-118.814893761649, 34.0080602407843], //Longitude, latitude
            [-118.808878330345, 34.0016642996246]  //Longitude, latitude
        ]
     };
     const simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 2
     };
    
     const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
     });
     graphicsLayer.add(polylineGraphic);
    
     // Create a polygon geometry
     const polygon = {
        type: "polygon",
        rings: [
            [-118.818984489994, 34.0137559967283], //Longitude, latitude
            [-118.806796597377, 34.0215816298725], //Longitude, latitude
            [-118.791432890735, 34.0163883241613], //Longitude, latitude
            [-118.79596686535, 34.008564864635],   //Longitude, latitude
            [-118.808558110679, 34.0035027131376]  //Longitude, latitude
        ]
     };
    
     const simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],  // Orange, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 1
        }
     };
    
     const popupTemplate = {
        title: "{Name}",
        content: "{Description}"
     }
     const attributes = {
        Name: "Graphic",
        Description: "I am a polygon"
     }
    
     const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol,
    
        attributes: attributes,
        popupTemplate: popupTemplate
    
     });
     graphicsLayer.add(polygonGraphic);
    
     });
    </script>
    </head>
    <body>
      <div id="viewDiv"></div>
    </body>
    </html>
```

