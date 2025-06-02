<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobListController;
use App\Http\Controllers\WelcomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public homepage route - uses WelcomeController@index
Route::get('/', [WelcomeController::class, 'index'])->name('home');

// Protected routes - only accessible if authenticated and email verified
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard route using DashboardController@index to pass data
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Joblist resource routes except 'show'
    Route::resource('joblist', JobListController::class)->except(['show']);

    // Job details route (custom show)
    Route::get('/jobdetails/{id}', [JobListController::class, 'show'])->name('joblist.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
