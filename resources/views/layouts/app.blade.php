<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    x-data="layout()"
    x-init="init()"
    :class="{ 'dark': dark }"
>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>
        @hasSection('title')
            @yield('title') • {{ config('app.name', 'Web4') }}
        @else
            {{ config('app.name', 'Web4') }}
        @endif
    </title>

    <meta name="description"
          content="@yield('description','Web4 Developer Platform')">

    <meta name="keywords"
          content="@yield('keywords','AI, Blockchain, Laravel, API, Web4')">

    <meta name="author"
          content="{{ config('app.name') }}">

    <meta name="csrf-token"
          content="{{ csrf_token() }}">

    <meta name="theme-color"
          content="#0f172a">

    <meta name="robots"
          content="index,follow">

    <meta property="og:type"
          content="website">

    <meta property="og:title"
          content="@yield('title', config('app.name'))">

    <meta property="og:description"
          content="@yield('description','Modern Web4 Platform')">

    <meta property="og:url"
          content="{{ url()->current() }}">

    <meta property="og:image"
          content="{{ asset('images/og-image.png') }}">

    <meta name="twitter:card"
          content="summary_large_image">

    <meta name="twitter:title"
          content="@yield('title', config('app.name'))">

    <meta name="twitter:description"
          content="@yield('description')">

    <link rel="canonical"
          href="{{ url()->current() }}">

    <link rel="manifest"
          href="{{ asset('manifest.webmanifest') }}">

    <link rel="icon"
          href="{{ asset('favicon.ico') }}">

    <link rel="apple-touch-icon"
          href="{{ asset('apple-touch-icon.png') }}">

    <link rel="preconnect"
          href="https://fonts.googleapis.com">

    <link rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin>

    @vite([
        'resources/css/app.css',
        'resources/js/app.js'
    ])

    @stack('meta')
    @stack('styles')
    @stack('head')

</head>

<body class="min-h-screen bg-slate-950 text-slate-100 antialiased">

<a href="#main-content"
   class="sr-only focus:not-sr-only fixed left-4 top-4 z-50 rounded bg-blue-600 px-4 py-2 text-white">
    Skip to content
</a>

<div class="fixed inset-0 -z-10 bg-grid opacity-20"></div>

<header class="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">

    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <a href="{{ url('/') }}"
           class="text-2xl font-bold text-gradient">
            {{ config('app.name','Web4') }}
        </a>

        <nav class="hidden lg:flex items-center gap-8">

            <a href="{{ url('/') }}" class="hover:text-blue-400">
                Home
            </a>

            <a href="{{ url('/docs') }}" class="hover:text-blue-400">
                Documentation
            </a>

            <a href="{{ url('/api') }}" class="hover:text-blue-400">
                API
            </a>

            <a href="{{ url('/dashboard') }}" class="hover:text-blue-400">
                Dashboard
            </a>

            <a href="{{ url('/downloads') }}" class="hover:text-blue-400">
                Downloads
            </a>

            <a href="{{ url('/blog') }}" class="hover:text-blue-400">
                Blog
            </a>

            <a href="{{ url('/contact') }}" class="hover:text-blue-400">
                Contact
            </a>

        </nav>

        <div class="flex items-center gap-3">

            <div class="hidden xl:block">
                <input
                    type="search"
                    placeholder="Search documentation..."
                    class="w-64 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 focus:border-blue-500 focus:outline-none">
            </div>

            <button
                @click="toggleTheme()"
                class="rounded-xl border border-slate-700 p-2"
                title="Toggle theme">

                <span x-show="!dark">🌙</span>
                <span x-show="dark">☀️</span>

            </button>

            <button
                @click="mobileOpen = !mobileOpen"
                class="rounded-xl border border-slate-700 p-2 lg:hidden">

                ☰

            </button>
