<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              {{ headerContent }}
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{ bodyContent }}
              <br>
              You placed {{ counter }} card in {{ time.toFixed(2) }} seconds
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button"
                @click="$emit('tryAgain')"
              >
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {dialog: {
      type: Object,
      default: ()=>{}
  }},
  emits: ['tryAgain'],
  data() {
    return {
      counter: { ...{ ...this.dialog }.finalResult }.counter,
      time: { ...{ ...this.dialog }.finalResult }.timeSpent,
      dialogData: { ...this.dialog },
    };
  },
  computed: {
    bodyContent() {
      if (this.dialogData.status == "win")
        return "Successfully finished! Congratulations!";
      if (this.dialogData.status == "lose")
        return "You lost this time, lets have another try!";
        console.log(this.dialogData)
        return false
    },
    headerContent() {
        if (this.dialogData.status == "win") return "🥳";
      if (this.dialogData.status == "lose") return "😯";
        return false
    },
  },
  created() {
    console.log(this.$props.dialog);
  },
};
</script>

<style>
.modal-header {
  text-align: center;
  font-size: 120px;
}



.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
