<template>
  <VAppBar class="px-12" flat color="black">
    <VBtn>
      <VIcon class="mr-2" color="yellow">fas fa-signature</VIcon>AHLAN
    </VBtn>

    <VSpacer />
    <VBtn variant="text" @click="scroll('home')" class="text-yellow">Home</VBtn>
    <VBtn variant="text" @click="scroll('about')">About</VBtn>
    <VBtn variant="text" @click="scroll('portfolio')">Portfolio</VBtn>
    <VBtn variant="text" @click="scroll('services')"> Services</VBtn>
    <VBtn variant="text" @click="scroll('page')"> Page</VBtn>
    <VBtn variant="text" @click="scroll('biog')"> Biog</VBtn>
    <VBtn variant="text" @click="scroll('contact')"> Contact</VBtn>
  </VAppBar>
</template>

<script setup>
const scroll = (refName) => {
  const el = document.getElementById(refName);
  el.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped></style>
