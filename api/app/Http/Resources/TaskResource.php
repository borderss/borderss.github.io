<?php

namespace App\Http\Resources;

use App\Models\Label;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'user' => $this->user,
      'board_id' => $this->board_id,
      'title' => $this->title,
      'desc' => $this->desc,
      'color' => $this->color,
      'labels' => $this->labels
    ];
  }
}
