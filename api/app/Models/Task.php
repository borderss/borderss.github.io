<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  use HasFactory;
  protected $fillable = [
    'id',
    'user_id',
    'board_id',
    'title',
    'desc',
    'color'
  ];

  public function labels()
  {
    return $this->hasMany(Label::class);
  }

  // public function board()
  // {
  //   return $this->belongsTo(Board::class, "board_id");
  // }

  public function user()
  {
    return $this->belongsTo(User::class, "user_id");
  }
}
