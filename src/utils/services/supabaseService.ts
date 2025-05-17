import { supabase } from '../supabase';

/**
 * Generic service for Supabase database operations
 */
export const supabaseService = {
  /**
   * Fetch data from a table with optional filters
   * @param table The table name
   * @param options Query options
   * @returns Promise with data and error
   */
  async fetch<T>(
    table: string, 
    options: {
      columns?: string;
      filters?: Record<string, any>;
      limit?: number;
      orderBy?: { column: string; ascending?: boolean };
    } = {}
  ) {
    const { columns = '*', filters = {}, limit, orderBy } = options;
    
    let query = supabase
      .from(table)
      .select(columns);
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply limit
    if (limit) {
      query = query.limit(limit);
    }
    
    // Apply ordering
    if (orderBy) {
      query = query.order(orderBy.column, { 
        ascending: orderBy.ascending ?? true 
      });
    }
    
    return await query as { data: T[] | null; error: any };
  },
  
  /**
   * Insert data into a table
   * @param table The table name
   * @param data The data to insert
   * @returns Promise with data and error
   */
  async insert<T>(table: string, data: Record<string, any> | Record<string, any>[]) {
    return await supabase
      .from(table)
      .insert(data)
      .select() as { data: T[] | null; error: any };
  },
  
  /**
   * Update data in a table
   * @param table The table name
   * @param data The data to update
   * @param match The column to match for update
   * @returns Promise with data and error
   */
  async update<T>(
    table: string, 
    data: Record<string, any>,
    match: { column: string; value: any }
  ) {
    return await supabase
      .from(table)
      .update(data)
      .eq(match.column, match.value)
      .select() as { data: T[] | null; error: any };
  },
  
  /**
   * Delete data from a table
   * @param table The table name
   * @param match The column to match for deletion
   * @returns Promise with data and error
   */
  async delete<T>(
    table: string,
    match: { column: string; value: any }
  ) {
    return await supabase
      .from(table)
      .delete()
      .eq(match.column, match.value)
      .select() as { data: T[] | null; error: any };
  }
}; 