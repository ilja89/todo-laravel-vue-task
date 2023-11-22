<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private TaskRepository $taskRepository;

    public function __construct(
        Request $request,
        TaskRepository $taskRepository
    ) {
        parent::__construct($request);
        $this->taskRepository = $taskRepository;
    }

    public function get(Request $request) {
        $id = $request->route('id');
        return $this->taskRepository->get($id);
    }
    public function getFiltered(Request $request): \Illuminate\Support\Collection
    {
        $options = $request->input('options') ? json_decode($request->input('options')) : new \stdClass();
        return $this->taskRepository->getFiltered($options);
    }
    public function create(Request $request) {
        $params = $request->input('newTaskParams');
        return $this->taskRepository->create($params);
    }
    public function update(Request $request): int
    {
        $id = (int)$request->route('id');
        $updatedTaskParams = $request->input('updatedTaskParams');
        return $this->taskRepository->update($id, $updatedTaskParams);
    }
    public function delete(Request $request): bool
    {
        $id = (int)$request->route('id');
        return $this->taskRepository->delete($id);
    }
}
