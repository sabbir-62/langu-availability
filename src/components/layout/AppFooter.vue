<template>
  <footer class="bg-footer-bg mt-10">
    <!-- Main Footer Links -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div v-for="section in sections" :key="section.title">
          <h4 class="footer-title">{{ section.title }}</h4>
          <ul class="space-y-1.5">
            <li v-for="link in section.links" :key="link">
              <a href="#" class="footer-link">{{ link }}</a>
            </li>
          </ul>
        </div>

        <!-- Follow Us Column -->
        <div>
          <h4 class="footer-title">Follow us</h4>
          <div class="flex items-center gap-3 mt-2">
            <!-- Facebook -->
            <a href="#" class="w-8 h-8 rounded-full bg-gray-600 hover:bg-blue-600 flex items-center justify-center transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <!-- Twitter -->
            <a href="#" class="w-8 h-8 rounded-full bg-gray-600 hover:bg-sky-500 flex items-center justify-center transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a href="#" class="w-8 h-8 rounded-full bg-gray-600 hover:bg-pink-500 flex items-center justify-center transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bg-footer-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-gray-500 text-xs text-center sm:text-left">
          © Langu™ & Imprint ©2025. All rights reserved.
          <br class="sm:hidden" />
          <span class="hidden sm:inline"> | </span>
          CSR Office Road, London EC2R 8AH
        </p>
        <div class="flex items-center gap-3">
          <span class="text-gray-500 text-xs">Made with</span>
          <span class="text-red-400 text-sm">❤</span>
          <span class="text-gray-500 text-xs">in London, Berlin & Manila</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FOOTER_SECTIONS } from '@/constants'

const sections = FOOTER_SECTIONS
</script>
