<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskRepository
{
    private array $castOptions = [
        'done' => 'boolean'
    ];

    public function get(int $id) {
        return Task::query()
            ->find($id)
            ->withCasts($this->castOptions)
            ->get();
    }
    public function getFiltered(\stdClass $options): \Illuminate\Support\Collection
    {
        $query = Task::query();

        if (property_exists($options, 'done')) {
            $query = $query->where('done', '=', $options->done);
        }
        if (property_exists($options, 'shouldContain') && $options->shouldContain !== '') {
            $query = $query->where('title', 'like', '%'. $options->shouldContain. '%')
                ->orWhere('description', 'like', '%'. $options->shouldContain. '%');
            Log::debug(var_export($query->toSql(), true));
        }

        $sortByColumn = property_exists($options, 'sortBy') ? $options->sortBy : 'title';
        $direction = property_exists($options, 'orderBy') ? $options->orderBy : 'asc';

        return $query->orderBy($sortByColumn, $direction)
            ->withCasts($this->castOptions)
            ->get();
    }
    public function update(int $id, array $updatedTaskParams): int
    {
        return Task::query()
            ->where('id', '=', $id)
            ->update($updatedTaskParams);
    }
    public function create(array $params) {
        $id = DB::table('tasks')
            ->insertGetId($params);

        return $this->get($id);
    }
    public function delete(int $id): bool
    {
        return DB::table('tasks')
            ->delete($id) > 0;
    }
}
