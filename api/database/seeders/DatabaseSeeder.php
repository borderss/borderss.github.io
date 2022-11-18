<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Board;
use App\Models\Label;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // BOARDS
        Board::create([ 'name' => 'Backlog', ]);
        Board::create([ 'name' => 'To do', ]);
        Board::create([ 'name' => 'In progress', ]);
        Board::create([ 'name' => 'Designed', ]);
        

        // USERS
        User::create([
          'name' => 'user1',
          'email' => 'user1@gmail.com',
          'password' => Hash::make('password1'),
        ]);
        User::create([
          'name' => 'user2',
          'email' => 'user2@gmail.com',
          'password' => Hash::make('password2'),
        ]);
        User::create([
          'name' => 'user3',
          'email' => 'user3@gmail.com',
          'password' => Hash::make('password3'),
        ]);


        // TASKS
        Task::create([
          'user_id' => 1,
          'board_id' => 1,
          'title' => 'Twilio integration',
          'desc' => 'Finally implementing Twilio into the application workflow',
          'color' => '#BADA55'
        ]);
        Task::create([
          'user_id' => 1,
          'board_id' => 2,
          'title' => 'Example task',
          'desc' => null,
          'color' => '#BADA55'
        ]);
        Task::create([
          'user_id' => 2,
          'board_id' => 1,
          'title' => 'Second user\'s task',
          'desc' => 'Will another user see his own cards properly?',
          'color' => '#BADA55'
        ]);


        // LABELS
        Label::create([
          'task_id' => 1,
          'value' => 'First label',
        ]);
        Label::create([
          'task_id' => 1,
          'value' => 'Another label',
        ]);
        Label::create([
          'task_id' => 3,
          'value' => 'Testing',
        ]);
        Label::create([
          'task_id' => 1,
          'value' => 'Another',
        ]);
    }
}
