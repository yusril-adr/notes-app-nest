/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'text',
      primaryKey: true,
      unique: true,
      notNull: true,
    },
    user_id: {
      type: 'string',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
    },
    header: {
      type: 'text',
      notNull: true,
    },
    body: {
      type: 'text',
      notNull: true,
    },
    created_at: {
      type: 'datetime',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'datetime',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    is_deleted: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('notes');
};
