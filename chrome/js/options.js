function getProfiles () {
    var profilesStr = localStorage.OpenMTEditorScreen;
    var json;

    if (profilesStr) {
        json = JSON.parse(profilesStr);
        return {
            profiles: json
        };
    }

    return {};
}

function loadProfiles () {
    var profileData = getProfiles();
    var source = $("#tmpl_settings_body").html();
    var template = Handlebars.compile(source);
    var html;

    if (profileData) {
        html = template(profileData);
        $("#settings_body").append(html);
    }
}

function addProfile (e) {
    var profileData = getProfiles();
    var newProfile = {
        siteName: $("#new_sitename").val(),
        domain: $("#new_domain").val(),
        adminPath: $("#new_mt_admin_path").val()
    };

    e.preventDefault();

    if (!profileData) {
        profileData = {
            profiles: [newProfile]
        };
    } else {
        profileData.profiles.push(newProfile);
    }

    localStorage.OpenMTEditorScreen = JSON.stringify(profileData.profiles);

    document.location.reload();
}

function deleteProfile (index) {
    var profileData = getProfiles();

    if (profileData.profiles.length > index) {
        profileData.profiles.splice(index, 1);
        localStorage.OpenMTEditorScreen = JSON.stringify(profileData.profiles);
    }

    document.location.reload();
}

$(function () {
    loadProfiles();

    $("#new_site input[type='submit']").on("click", addProfile);

    $(".js-profile-delete").on("click", function (e) {
        var index = $(e.target).data("index");
        deleteProfile(index);
    });
});
