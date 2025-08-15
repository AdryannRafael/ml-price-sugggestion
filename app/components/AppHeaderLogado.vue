<template>
  <div
    class="w-full top-0 z-50 bg-gradient-to-r from-[#FFE600] to-[#3483FA] text-[#333333]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo/Título -->
        <AppLogo />
        <div class="flex text-base text-white font-medium">
          <img style="width: 40px" src="/logoml.svg" />
          <span class="pl-2">{{ auth?.name }}</span>
        </div>
        <!-- Menu para desktop
        <div class="hidden md:block"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { auth } = useAuthMl();
</script>

<style scoped></style>
