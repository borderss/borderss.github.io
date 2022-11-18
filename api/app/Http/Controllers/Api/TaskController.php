<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\LabelResource;
use App\Http\Resources\TaskResource;
use App\Models\Label;
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
    $task = new TaskResource($new_task);

    foreach ($request["labels"] as $label => $value) {
      $new_label = Label::create([
        'task_id' => $task->id,
        'value' => $value
      ]);
    }
    return $task;
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

  public function destroy($id)
  {
    Task::destroy($id);
    return ['messages' => 'success'];
  }
}
