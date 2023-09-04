module.exports = {
  pagination: function (CRITERIA) {
    var vPrevious = "Previous";
    var vNext = "Next";
    var vFirst = "First";
    var vLast = "Last";
    var vPage = "";
    var vItemPerPage = "";
    var vStart = "";
    var vLimit = "";
    var No = "";
    var vPaginationTemplate = "";
    var vResponse = {};

    if (parseInt(CRITERIA.vPage)) {
      vPage = parseInt(CRITERIA.vPage);
    } else {
      vPage = 1;
    }

    if (parseInt(CRITERIA.vItemPerPage)) {
      vItemPerPage = parseInt(CRITERIA.vItemPerPage);
    } else {
      vItemPerPage = 5;
    }

    var vPageCount = Math.ceil(
      parseInt(CRITERIA.vCount) / parseInt(vItemPerPage)
    );

    vPaginationTemplate =
      vPaginationTemplate + '<nav aria-label="Page navigation example">';
    vPaginationTemplate =
      vPaginationTemplate + '<ul class="pagination pagination-primary">';

    // // First Button Logic
    // if (parseInt(vPage) == 1) {
    //   // vPaginationTemplate = vPaginationTemplate + '<li class="ivu-page-item"><a class="ajax_page " data-id="1" href="javascript:;">' + vFirst + '</a></li>';
    // } else {
    //   vPaginationTemplate =
    //     vPaginationTemplate +
    //     '<li class="page-item"><a class="page-link ajax_page " data-id="1" href="javascript:;">'  +
    //     vFirst +
    //     "</a></li>";
    // }

    // Previous Button Logic
    if (parseInt(vPage) == 1) {
      vPaginationTemplate = vPaginationTemplate + '<li class="page-item"><a class="page-link ajax_page " data-id="1" href="javascript:;">' + vPrevious + '</a></li>';
    } else {
      No = parseInt(vPage) - 1;
      vPaginationTemplate =
        vPaginationTemplate +
        '<li class="page-item"><a class="page-link ajax_page " data-id="' +
        No +
        '" href="javascript:;">' +
        vPrevious +
        "</a></li>";
    }

    // Middle Button Logic
    var i = 0;
    var leftCount = Math.ceil(vItemPerPage / 2) - 1;
    var rightCount = parseInt(vItemPerPage) - parseInt(leftCount) - 1;

    if (parseInt(vPage) + parseInt(rightCount) > parseInt(vPageCount)) {
      leftCount =
        parseInt(vItemPerPage) - (parseInt(vPageCount) - parseInt(vPage)) - 1;
    }
    if (parseInt(vPage) - parseInt(leftCount) < 1) {
      leftCount = parseInt(vPage) - 1;
    }

    var Start = parseInt(vPage) - parseInt(leftCount);

    while (i < vItemPerPage && i < vPageCount) {
      No = Start;
      if (parseInt(Start) == parseInt(vPage)) {
        vPaginationTemplate =
          vPaginationTemplate +
          '<li class="page-item active"><a class="page-link ajax_page " data-id="' +
          No +
          '" href="javascript:;">' +
          No +
          "</a></li>";
      } else {
        vPaginationTemplate =
          vPaginationTemplate +
          '<li class="page-item"><a class="page-link ajax_page " data-id="' +
          No +
          '" href="javascript:;">' +
          No +
          "</a></li>";
      }

      Start++;
      i++;
    }

    // Next Button Logic
    if (parseInt(vPage) == parseInt(vPageCount)) {
      vPaginationTemplate = vPaginationTemplate + '<li class="page-item"><a class="page-link ajax_page " data-id="'+vPageCount+'" href="javascript:;">' + vNext + '</a></li>';
    } else {
      if (parseInt(vPage) >= parseInt(vPageCount)) {
        No = parseInt(vPageCount);
        vPaginationTemplate =
          vPaginationTemplate +
          '<li class="page-item"><a class="page-link ajax_page " data-id="' +
          No +
          '" href="javascript:;">' +
          vNext +
          "</a></li>";
      } else {
        No = parseInt(vPage) + 1;
        vPaginationTemplate =
          vPaginationTemplate +
          '<li class="page-item"><a class="page-link ajax_page " data-id="' +
          No +
          '" href="javascript:;">' +
          vNext +
          "</a></li>";
      }
    }

    // // Last Button Logic
    // if (parseInt(vPage) == parseInt(vPageCount)) {
    //   //vPaginationTemplate = vPaginationTemplate + '<li class="ivu-page-item"><a class="ajax_page " data-id="'+vPageCount+'" href="javascript:;">' + vLast + '</a></li>';
    // } else {
    //   vPaginationTemplate =
    //     vPaginationTemplate +
    //     '<li class="page-item"><a class="page-link ajax_page " data-id="' +
    //     vPageCount +
    //     '" href="javascript:;">' +
    //     vLast +
    //     "</a></li>";
    // }

    vPaginationTemplate = vPaginationTemplate + "</ul>";
    vPaginationTemplate = vPaginationTemplate + "</nav>";

    vResponse.vPagination = vPaginationTemplate;
    if (parseInt(vPage) == 1) {
      vResponse.vStart = 0;
    } else {
      vResponse.vStart = (parseInt(vPage) - 1) * parseInt(vItemPerPage);
    }
    vResponse.vLimit = parseInt(vItemPerPage);

    return vResponse;
  },
};
