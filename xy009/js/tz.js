history["replaceState"](null, window["document"]["title"], location["pathname"] + "#!/stealingyourhistory");
history["pushState"](null, window["document"]["title"], location["pathname"]);
window["addEventListener"]("popstate", function() {
    if (location["hash"] === "#!/stealingyourhistory") {
        history["replaceState"](null, window["document"]["title"], location["pathname"]);
        $('.ceng')["css"]('display', 'block');
    }
}, false);