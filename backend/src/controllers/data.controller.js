import { supabase } from "../lib/supabase.js";

export async function getUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*");
    

    if (error) {
      console.error("Users query failed:", error);
      throw error;
    }

    return data;
  } catch (error) {
    throw (error);
  }
}

export async function getPatients() {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*");
    
    if (error) {
      console.error("patients query failed:", error);
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function data_lookup(req, res) {

  try {
    const users_data = await getUsers();
    const patients_data = await getPatients();
    const combined_data = {
      users: users_data,
      patients: patients_data
    }
    res.status(200).json(combined_data);

  } catch (error) {
    res.status(500).json({ message: "error fetching users/patients data" });
  }

}