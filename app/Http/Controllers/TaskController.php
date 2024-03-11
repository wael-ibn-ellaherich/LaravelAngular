<?php

namespace App\Http\Controllers;
use App\Models\Task; 
use Illuminate\Http\Request;

class TaskController extends Controller
{


    public function addTask(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|max:255',
        'description' => 'required',
        'priority' => 'required|integer|between:1,5',
        'due_date' => 'required|date',
    ]);

    $task = Task::create($validatedData);
    return response()->json($task, 201);
}

public function index()
{
    $tasks = Task::all();
    return response()->json($tasks);
}

public function update(Request $request, Task $task)
{
    $validatedData = $request->validate([
        'title' => 'required|max:255',
        'description' => 'required',
        'priority' => 'required|integer|between:1,5',
        'due_date' => 'required|date',
    ]);

    $task->update($validatedData);

    return response()->json($task, 200);
}

public function destroy(Task $task)
{
    $task->delete();

    return response()->json(null, 204);
}

}
