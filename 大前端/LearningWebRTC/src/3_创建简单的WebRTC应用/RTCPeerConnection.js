let configuration = {
    bundlePolicy: "max-compat"
};

myConnection.addTrack = function(stream) {
    console.log(stream);
};