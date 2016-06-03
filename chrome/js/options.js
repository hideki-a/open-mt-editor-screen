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
    var newProfile;
    var domain;

    e.preventDefault();

    domain = $("#new_domain").val().replace(/(https?:\/\/[^\/]+).*/, "$1");
    newProfile = {
        siteName: $("#new_sitename").val(),
        domain: domain,
        adminPath: $("#new_mt_admin_path").val()
    };

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
