<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BoardRequest;
use App\Http\Resources\BoardResource;
use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
  public function index()
  {
    return BoardResource::collection(Board::all());
  }

  public function store(BoardRequest $request)
  {
    $new_board = Board::create($request->validated());
    return new BoardResource($new_board);
  }

  public function show(Board $board)
  {
    return new BoardResource($board);
  }

  public function update(BoardRequest $request, Board $board)
  {
    $board->update($request->validated());
    return new BoardResource($board);
  }

  public function destroy(Board $board)
  {
    $board->delete();
    return new BoardResource($board);
  }
}
