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
    var adminDomain;

    e.preventDefault();

    domain = $("#new_domain").val().replace(/(https?:\/\/[^\/]+).*/, "$1");
    adminDomain = $("#new_admin_domain").val().replace(/(https?:\/\/[^\/]+).*/, "$1");
    newProfile = {
        siteName: $("#new_sitename").val(),
        domain: domain,
        adminDomain: adminDomain,
        adminPath: $("#new_mt_admin_path").val(),
        dirIndex: $("#dirindex_filename").val()
    };

    if (profileData.profiles && profileData.profiles.length) {
        profileData.profiles.push(newProfile);
    } else {
        profileData = {
            profiles: [newProfile]
        };
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
