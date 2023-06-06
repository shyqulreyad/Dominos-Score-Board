$(document).ready(function () {
  $(".score_board").hide();
  $(".game_select").change(function () {
    var game_select = $(this).val();
    $.cookie("game_select", game_select);
    if (game_select == "" || game_select == null) {
      // add a div to show that no game is selected
      $(".score_board").hide();
      $("#no_game_selected").remove();
      $(".main_body").append(
        `      <div
          class="d-flex justify-content-md-center align-items-center vh-100" id="no_game_selected"
        >
          <div
            class="alert alert-primary container mt-10 text-center"
            role="alert"
          >
            Please select a game or create a new game
          </div>
        </div>`
      );

      return false;
    } else {
      getScore(game_select);
    }
  });

  function getScore(game_id) {
    $("#no_game_selected").remove();
    var score = JSON.parse(localStorage.getItem("score_board" + game_id));
    console.log(score);
    var keys = Object.keys(score);
    $(".player_one").text(score[keys[0]][0] ? score[keys[0]][0] : "Player One");
    $("#first_player_score").attr("data-player_id", keys[0]);
    $(".player_two").text(score[keys[1]][0] ? score[keys[1]][0] : "Player Two");
    $("#second_player_score").attr("data-player_id", keys[1]);
    $(".player_three").text(
      score[keys[2]][0] ? score[keys[2]][0] : "Player Three"
    );
    $("#third_player_score").attr("data-player_id", keys[2]);
    $(".player_four").text(
      score[keys[3]][0] ? score[keys[3]][0] : "Player Four"
    );
    $("#fourth_player_score").attr("data-player_id", keys[3]);

    var data = "";
    var first_player_total = 0;
    var second_player_total = 0;
    var third_player_total = 0;
    var fourth_player_total = 0;
    for (var i = 1; i < score[keys[0]].length; i++) {
      var row = `<tr>
        <td class="text-center">${
          score[keys[0]][i] ? score[keys[0]][i] : 0
        }</td>
        <td class="text-center">${
          score[keys[1]][i] ? score[keys[1]][i] : 0
        }</td>
        <td class="text-center">${
          score[keys[2]][i] ? score[keys[2]][i] : 0
        }</td>
        <td class="text-center">${
          score[keys[3]][i] ? score[keys[3]][i] : 0
        }</td>
      </tr>`;
      first_player_total += parseInt(score[keys[0]][i] ? score[keys[0]][i] : 0);
      second_player_total += parseInt(
        score[keys[1]][i] ? score[keys[1]][i] : 0
      );
      third_player_total += parseInt(score[keys[2]][i] ? score[keys[2]][i] : 0);
      fourth_player_total += parseInt(
        score[keys[3]][i] ? score[keys[3]][i] : 0
      );
      data += row;
    }
    if (data == "") {
      data = `<tr>
      <td colspan="4" class="text-center">Game is not started Yet</td>
    </tr>`;
    }
    $("#tasklist").empty();
    $("#tasklist").append(data);
    $(".first_player_total").text(
      first_player_total == 0 ? "N/A" : first_player_total
    );
    // add text color red if score is greater than 100
    if (first_player_total >= 100) {
      toastr.error("Kick out " + score[keys[0]][0] + " from the game", "", {
        positionClass: "toast-top-center",
        closeButton: true,
        progressBar: true,
      });
      $(".first_player_total").addClass("text-danger");
    } else {
      $(".first_player_total").removeClass("text-danger");
    }
    $(".second_player_total").text(
      second_player_total == 0 ? "N/A" : second_player_total
    );
    if (second_player_total >= 100) {
      toastr.error("Kick out " + score[keys[1]][0] + " from the game", "", {
        positionClass: "toast-top-center",
        closeButton: true,
        progressBar: true,
      });
      $(".second_player_total").addClass("text-danger");
    } else {
      $(".second_player_total").removeClass("text-danger");
    }
    $(".third_player_total").text(
      third_player_total == 0 ? "N/A" : third_player_total
    );
    if (third_player_total >= 100) {
      toastr.error("Kick out " + score[keys[2]][0] + " from the game", "", {
        positionClass: "toast-top-center",
        closeButton: true,
        progressBar: true,
      });
      $(".third_player_total").addClass("text-danger");
    } else {
      $(".third_player_total").removeClass("text-danger");
    }
    $(".fourth_player_total").text(
      fourth_player_total == 0 ? "N/A" : fourth_player_total
    );
    if (fourth_player_total >= 100) {
      toastr.error("Kick out " + score[keys[3]][0] + " from the game", "", {
        positionClass: "toast-top-center",
        closeButton: true,
        progressBar: true,
      });

      $(".fourth_player_total").addClass("text-danger");
    } else {
      $(".fourth_player_total").removeClass("text-danger");
    }

    $(".score_board").show();
  }

  show_all_games();
  var game_select = $.cookie("game_select");
  if (game_select != 0 && game_select != undefined) {
    $(".game_select").val(game_select);
    getScore(game_select);
  } else {
    game_select = 0;
  }
  // Create a new game and save it to local storage start
  // on click create_new_game button save the game name and id to local storage
  $("#create_new_game").click(function () {
    var game_name = $("#game_name").val();
    // generate random number for game id
    var game_id = Math.floor(Math.random() * 1000000000);
    // check if game exist in local storage and if it does get the data and push the new game to the array
    var data = JSON.parse(localStorage.getItem("game"));
    if (
      $("#first_player").val() == "" ||
      $("#second_player").val() == "" ||
      game_name == ""
    ) {
      toastr.error("Please add Game name and Minimum two players");
      return false;
    }
    if (data) {
      data.push({
        id: game_id,
        name: game_name,
      });
      localStorage.setItem("game", JSON.stringify(data));
    } else {
      // if game does not exist in local storage create a new array and push the game to the array
      var game = [];
      game.push({
        id: game_id,
        name: game_name,
      });
      localStorage.setItem("game", JSON.stringify(game));
    }
    // generate unique id for each player
    var first_player_id = Math.floor(Math.random() * 1000000000);
    var second_player_id = Math.floor(Math.random() * 1000000000);
    var third_player_id = Math.floor(Math.random() * 1000000000);
    var fourth_player_id = Math.floor(Math.random() * 1000000000);
    // push the player name and id to local storage
    var first_player = $("#first_player").val()
      ? $("#first_player").val()
      : "Player One";
    var second_player = $("#second_player").val()
      ? $("#second_player").val()
      : "Player Two";
    var third_player = $("#third_player").val()
      ? $("#third_player").val()
      : "Player Three";
    var fourth_player = $("#fourth_player").val()
      ? $("#fourth_player").val()
      : "Player Four";
    var score_board = {
      [first_player_id]: [first_player],
      [second_player_id]: [second_player],
      [third_player_id]: [third_player],
      [fourth_player_id]: [fourth_player],
    };

    localStorage.setItem("score_board" + game_id, JSON.stringify(score_board));
    show_all_games();
    $(".game_select").val(game_id);
    $.cookie("game_select", game_id);
    getScore(game_id);
    $("#game_name").val("");
    $("#create_game").modal("hide");
    toastr.success("Game Created Successfully", "", {
      positionClass: "toast-top-center",
      closeButton: true,
      progressBar: true,
    });
  });

  // Create a new game and save it to local storage End

  // get all games from local storage and show them in the game_select dropdown
  function show_all_games() {
    var all_game = JSON.parse(localStorage.getItem("game"));
    console.log(all_game);
    if (all_game) {
      $(".game_select").html("");
      $(".game_select").append('<option value="">Select Game</option>');
      $.each(all_game, function (index, value) {
        $(".game_select").append(
          '<option value="' + value.id + '">' + value.name + "</option>"
        );
      });
    } else {
      $(".game_select").html("");
      $(".game_select").append('<option value="">No Game Found</option>');
    }
  }

  // create new score
  $("#create_new_score").click(function () {
    var game_select = $(".game_select").val();
    var score_board = JSON.parse(
      localStorage.getItem("score_board" + game_select)
    );
    var first_player_score = $("#first_player_score").val();
    var second_player_score = $("#second_player_score").val();
    var third_player_score = $("#third_player_score").val();
    var fourth_player_score = $("#fourth_player_score").val();
    var first_player_id = $("#first_player_score").attr("data-player_id");
    var second_player_id = $("#second_player_score").attr("data-player_id");
    var third_player_id = $("#third_player_score").attr("data-player_id");
    var fourth_player_id = $("#fourth_player_score").attr("data-player_id");
    score_board[first_player_id].push(first_player_score);
    score_board[second_player_id].push(second_player_score);
    score_board[third_player_id].push(third_player_score);
    score_board[fourth_player_id].push(fourth_player_score);
    localStorage.setItem(
      "score_board" + game_select,
      JSON.stringify(score_board)
    );
    getScore(game_select);
    $("#first_player_score").val("");
    $("#second_player_score").val("");
    $("#third_player_score").val("");
    $("#fourth_player_score").val("");
    $("#add_score").modal("hide");
    toastr.success("Score Created Successfully", "", {
      positionClass: "toast-top-center",
      closeButton: true,
      progressBar: true,
    });
  });
});
