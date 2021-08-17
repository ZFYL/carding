<template>
  <div class="lead">
    <h2 class="center">
      Your local Leaderboard
    </h2>
    <table class="leaderboard">
      <tbody>
        <tr class="lea-head-tr">
          <td>Attempt</td>
          <td>Time spent</td>
          <td>Number of cards</td>
          <td>Reaction time</td>
          <td>Win</td>
        </tr>
        <tr
          v-for="(line, index) in leaderboard"
          :key="line"
          class="lea-body-tr"
        >
          <td>{{ index }}</td>
          <td>{{ line.timeSpent.toFixed(2) }}</td>
          <td>{{ line.counter }}</td>
          <td>{{ (line.timeSpent / line.counter).toFixed(2) }}</td>
          <td>
            <span v-if="line.win">✅</span> <span v-if="!line.win">❌</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  computed: {
    leaderboard: () => {
      return JSON.parse(localStorage.leaderboard ?? "[]");
    },
  },
};
</script>

<style>
table.leaderboard {
  display: block;
  width: 80%;
  margin: auto;
  min-width: 300px;
}

table.leaderboard tbody {
  width: 100%;
}

.leaderboard td {
  padding: 5px;
  font-size: 16px;
  border: 0px;
}

.lea-head-tr {
  font-weight: 800;
  background-color: rgb(228, 228, 228);
}

td {
  width: 20%;
}

</style>
