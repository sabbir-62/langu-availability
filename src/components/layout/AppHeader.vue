<template>
  <header class="w-full bg-[#FFFFFF] sticky top-0 z-30 border-b">
    <div
      class="max-w-7xl mx-auto flex items-center justify-between px-3 py-1 "
    >
      <!-- Logo -->
      <div class="flex items-center gap-2 cursor-pointer">
        <img
          src="../../assets/images/logo.png.png"
          alt="Logo"
          class="w-[73px] h-[51px]"
        />
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-4 text-xs uppercase tracking-wider font-poppins">
        <!-- Menu Links -->
        <template v-for="(link, index) in links" :key="index">
          <a href="#" class="hover:text-white transition-colors">
            {{ link }}
          </a>
          <!-- Divider between links -->
          <span class="w-px h-5 bg-gray-500 inline-block"></span>
        </template>

        <!-- Login -->
        <a href="#" class="hover:text-white transition-colors">
          LOG IN/SIGN UP
        </a>

        <!-- Divider after auth -->
        <span class="w-px h-5 bg-gray-500 inline-block"></span>

        <!-- Flag -->
        <img
          src="https://flagcdn.com/gb.svg"
          alt="UK Flag"
          class="w-5 h-4 object-cover rounded-sm"
        />

        <!-- Divider after flag -->
        <span class="w-px h-5 bg-gray-500 inline-block"></span>
      </nav>

      <!-- Mobile Hamburger -->
      <button @click="menuOpen = true" class="lg:hidden text-white p-1">
        <svg
          width="24"
          height="24"
          color="#000000"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <template v-if="menuOpen">
      <div class="mobile-menu-overlay" @click="menuOpen = false"></div>
      <div class="mobile-menu-panel">
        <div class="flex items-center justify-between p-4 border-b">
          <svg width="32" height="32" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#2bbcb3"
              stroke-width="2"
            />
            <text
              x="20"
              y="26"
              text-anchor="middle"
              fill="#2bbcb3"
              font-size="16"
              font-weight="700"
              font-family="Poppins"
            >
              L
            </text>
          </svg>
          <button
            @click="menuOpen = false"
            class="text-gray-500 hover:text-gray-800 p-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav class="flex flex-col py-2">
          <a
            v-for="link in links"
            :key="'m' + link"
            href="#"
            class="px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {{ link }}
          </a>
          <div class="border-t my-2"></div>
          <a href="#" class="px-6 py-3 text-sm font-semibold text-primary-teal">
            LOG IN / SIGN UP
          </a>
        </nav>
      </div>
    </template>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { NAV_LINKS } from "@/constants";

const links = NAV_LINKS;
const menuOpen = ref(false);
</script>
