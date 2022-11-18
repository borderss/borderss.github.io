<?php

use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\LabelController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
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

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth:api'])->group(function() {
  Route::get('/user', [UserController::class, 'user']);
  Route::get('/logout', [UserController::class, 'logout']);
  Route::apiResource('boards', BoardController::class);
  Route::apiResource('tasks', TaskController::class);
  Route::apiResource('labels', LabelController::class);
});

