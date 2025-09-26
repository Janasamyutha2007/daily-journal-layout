$(document).ready(function () {
  // Word count live
  $("#entry-text").on("input", function () {
    let words = $(this).val().trim().split(/\s+/).filter(w => w.length > 0);
    $("#word-count").text(words.length);
  }).trigger("input");

  // Mood change
  $("#mood-select").change(function () {
    $(this).closest(".journal-entry").attr("data-mood", $(this).val());
  });

  // Unlock fake password
  $(".unlock-btn").click(function () {
    $(this).closest(".fake-password").next(".locked").removeClass("locked").hide().fadeIn(600);
  });

  // Add comment
  $("#add-comment").click(function () {
    let text = $("#comment-input").val().trim();
    if (text) {
      $(".comments").append(`<div class="comment p-2 border rounded mt-1">${text}</div>`);
      $("#comment-input").val("");
    }
  });

  // Night mode toggle
  $("#night-toggle").change(function () {
    $("body").toggleClass("night-mode");
  });

  // Search + Filter functionality
  function filterEntries() {
    let search = $("#search-input").val().toLowerCase();
    let mood = $("#filter-mood").val();

    $(".journal-entry").each(function () {
      let text = $(this).text().toLowerCase();
      let entryMood = $(this).data("mood");
      let matchesSearch = text.includes(search);
      let matchesMood = (mood === "all" || mood === entryMood);

      if (matchesSearch && matchesMood) $(this).stop(true, true).fadeIn(300);
      else $(this).stop(true, true).fadeOut(300);
    });
  }

  $("#search-input, #filter-mood").on("input change", filterEntries);

  // Reset filters
  $("#clear-filters").click(function () {
    $("#search-input").val("");
    $("#filter-mood").val("all");
    filterEntries();
  });
});
