function isIpValid(value) {
    // Using Regex expression for validating IPv4
    var ipAddressRegex =
            /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    return ipAddressRegex.test(value);
}

function isDomainValid(value) {
    var domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
    return domainRegex.test(value);
}

jQuery(document).ready(function ($) {
    var api_key = "at_YikWy1eQ7qFpUGSOJrsVaxqITYXci";
    var ip = null;
    var domain = null;

    $("#js-btn").click(function () {
        var ipOrDomain = $("#js-input").val();

        if (isIpValid(ipOrDomain)) {
            ip = ipOrDomain;
            console.log('ip', ip);
        } else if (isDomainValid(ipOrDomain)){
            domain = ipOrDomain;
            console.log('domain', domain);
        } else {
            alert('invalid');
        }

        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: { apiKey: api_key, ipAddress: ip, domain: domain},
            success: function (data) {
                // $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");

                ipStr = data['ip'];
                locationStr = data['location']['country'] + ', ' + data['location']['region'] + ', ' + data['location']['city'] + data['location']['postalCode']
                timeZoneStr = 'UTC' + data['location']['timezone'];
                ispStr = data['isp'];
                
                $('#ip-value').html(ipStr);
                $('#location-value').html(locationStr);
                $('#timezone-value').html(timeZoneStr);
                $('#isp-value').html(ispStr);

            },
            error: function (xhr) {
                alert('An error occured, Please try again later');
            }
        });

    });

});