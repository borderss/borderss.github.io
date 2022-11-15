<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LabelRequest;
use App\Http\Resources\LabelResource;
use App\Models\Label;
use Illuminate\Http\Request;

class LabelController extends Controller
{
  public function index()
  {
    return LabelResource::collection(Label::all());
  }

  public function store(LabelRequest $request)
  {
    $new_label = Label::create($request->validated());
    return new LabelResource($new_label);
  }

  public function show(Label $label)
  {
    return new LabelResource($label);
  }

  public function update(LabelRequest $request, Label $label)
  {
    $label->update($request->validated());
    return new LabelResource($label);
  }

  public function destroy(Label $label)
  {
    $label->delete();
    return new LabelResource($label);
  }
}
