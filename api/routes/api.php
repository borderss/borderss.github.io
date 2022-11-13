<?php

use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\LabelController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::post('/login', 'Auth\UserAuthController@login');

// Route::get('/tasks', [TaskController::class, 'index']);

Route::apiResource('/boards', BoardController::class);
Route::apiResource('/tasks', TaskController::class);
Route::apiResource('/labels', LabelController::class);