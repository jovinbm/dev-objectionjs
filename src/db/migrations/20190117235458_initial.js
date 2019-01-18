const { createTableIfNotExists } = require('../helpers');

exports.up = async knex => {
  const fns = [
    () =>
      createTableIfNotExists(knex, 'user', table => {
        table
          .increments('id')
          .index()
          .unique()
          .notNullable()
          .unsigned();
        table
          .uuid('uuid')
          .index()
          .notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.text('bio').notNullable();
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable();
        table
          .timestamp('updated_at')
          .defaultTo(knex.fn.now())
          .notNullable();
      }),
    () =>
      createTableIfNotExists(knex, 'pet', table => {
        table
          .increments('id')
          .notNullable()
          .unsigned();
        table
          .uuid('uuid')
          .index()
          .notNullable();
        table
          .uuid('user_uuid')
          .index()
          .references(`user.uuid`)
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('type').notNullable();
        table.string('name').notNullable();
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable();
        table
          .timestamp('updated_at')
          .defaultTo(knex.fn.now())
          .notNullable();
      }),
  ];

  for (const fn of fns) {
    await fn();
  }
};

exports.down = async knex => {
  const fns = [
    () => knex.schema.dropTableIfExists('pet'),
    () => knex.schema.dropTableIfExists('user'),
  ];

  for (const fn of fns) {
    await fn();
  }
};
