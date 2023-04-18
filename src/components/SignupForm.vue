<script lang="ts" setup>
import { computed, ref } from "vue";
import FormInput from "../components/FormInput.vue"
import { NewUser } from "../users"
import { validate, length, required } from "../validation"
import { useUsers } from "../stores/users"
import { useModal } from "../composables/modal";

const username = ref('')
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 3, max: 100 })])
})

const password = ref('')
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 1000 })])
})

const isInvalid = computed(() => {
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit() {
  if (isInvalid.value) {
    return
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }
  await usersStore.createUser(newUser)
  modal.hideModal()
}

</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="Username" v-model="username" :status="usernameStatus" type="text" />
    <FormInput name="Password" v-model="password" :status="passwordStatus" type="password" />
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  margin-top: 30px;
  padding: 50px;
}
</style>
