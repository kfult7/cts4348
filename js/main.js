// display date
var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();


// navigation
$("main section nav ul li").click(function() {
    $("main section nav ul li").removeClass("active");
    $("div.container div").removeClass("active");
    $("div." + $(this).attr("class")).addClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("vm")) {
        $("div.container div.vm h2").html($(this).find("span.name").html());
    }

    if (vms !== null) {
        var thisVM = $(this).data("vm")
        $("div.machine ul li.host").html(thisVM.host);
        $("div.machine ul li.port").html(thisVM.vnc_port);
        $("div.machine ul li.password").html(thisVM.vnc_password);
        console.log(thisVM)
        $("div.snapshots ul li:not(.template)").remove();
        for (var i in thisVM.snapshots) {
            var li = $("div.snapshots ul li.template").clone(true).removeClass("template");
            $(li).find(".title").removeAttr("contenteditable");
            $(li).find("span.title").html(thisVM.snapshots[i].name);
            $(li).find("span.date").html(thisVM.snapshots[i].timestamp);
            $("div.snapshots ul").append(li);
        }
    }

    $("main section nav ul").removeAttr("class")
    $("main section nav ul").addClass($(this).attr("data-position"))
})

// progress bar
function progress() {
    var elem = document.getElementById("progressBar");
    var width = 1;
    var id = setInterval(frame, 50);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width / 3 + '%';
            document.getElementById("bar").innerHTML = width * 1 + '%';
        }
    }
}

// delete snapshot
$("button.delete").click(function() {
    if (($("div.snapshots ul li:not(.template)").length == 5) && ($("div.snapshots ul li span.title").last().html() != "new snapshot")) {
        $("div.snapshots ul").append($("div.snapshots ul li.template").clone(true).removeClass("template"));
    }
    var name = $("div.snapshots ul li").find("span.title").html();
    if (confirm("Are you sure you want to delete this snapshot?")) {
        $(this).closest("li").remove();
    }
})

// new snapshot actions
function newSnapshot() {
    if ($("div.snapshots ul li:not(.template)").length < 6) {
        var li = $(this).closest("li");

        if ($(li).find("span.title").html() === "" || $(li).find("span.title").html() === "new snapshot") {
            alert("Please give this snapshot a name");
            return;
        }

        $(this).remove();
        $(li).removeClass("new").find(".title").removeAttr("contenteditable");
        $(li).find("button").removeClass("hidden");
        var d = new Date();
        var myDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + " " + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds())
        $(li).find("span.date").html(myDate);

        if ($("div.snapshots ul li:not(.template)").length < 5) {
            $("div.snapshots ul").append($("div.snapshots ul li.template").clone(true).removeClass("template"));
        }
    } else {
        alert("Snapshot limit is 5")
    }
}

// add snapshot
newSnapshot();
$("button.add").click(newSnapshot);

// clear new snapshot name
$("div.snapshots ul li span.title").click(function() {
    if ($(this).closest("span.title").html() === "new snapshot") {
        $(this).closest("span.title").html("");
    }
});

// insert name if blank
$("div.snapshots ul li span.title").blur(function() {
    if ($(this).closest("span.title").html() === "") {
        $(this).closest("span.title").html("new snapshot");
    }
});

//limit snapshot name size
var maxSnapshotName = 12;
$("div.snapshots ul li span.title").keypress(function(e) {
    var snapshotName = $(this).closest("span.title").html()

    if (snapshotName.length === maxSnapshotName) {
        e.preventDefault();
    }
});

//pull data from db
var vms = null

function pull(username) {
    var url = "http://10.128.1.151/sql/"
    $.ajax({
        url: url,
        method: "POST",
        data: "username=" + username,
        success: function(data) {
            vms = JSON.parse(data)
            for (var i in vms) {
                var li = $("li.vm")[i];
                $(li).find("span.ip").html(vms[i].ip);
                $(li).find("span.name").html(vms[i].name);
                $(li).data("vm", vms[i]);
            }
        },
    });
}

$("div.machine span button").click(function() {

    // ?? who is active ??
    $("nav ul li.active").data("vm").name


    var url = "http://10.128.1.151/sql/action/index.php";
    $.ajax({
        url: url,
        method: "POST",
        dataType: "JSON",
        data: {
            name: $("nav ul li.active").data("vm").name,
            action: $(this).attr("data-name")
        },
        success: function(data) {
            console.log(data)
            switch (data.status) {
                case 200:
                    console.log("-_____-");
                    break;
                case 404:
                    alert(data.message);
                    break;
                default:
            }
        },
    });
})
