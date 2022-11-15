<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
  public function index()
  {
    return TaskResource::collection(Task::all());
  }

  public function store(TaskRequest $request)
  {
    $new_task = Task::create($request->validated());
    return new TaskResource($new_task);
  }

  public function show(Task $task)
  {
    return new TaskResource($task);
  }

  public function update(TaskRequest $request, Task $task)
  {
    $task->update($request->validated());
    return new TaskResource($task);
  }

  public function destroy(Task $task)
  {
    $task->delete();
    return new TaskResource($task);
  }
}
