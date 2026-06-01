
import { supabase } from "../lib/supabase.js";
import { compose } from "../services/compositionEngine.js";


export async function composeContext(req, res) {
  try {
    const {
      userId,
      patientId,
      budget = 2000
    } = req.body || {};

    const {
      data: user,
      error: userError
    } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      throw new Error(
        `Failed to fetch user: ${userError.message}`
      );
    }

    const {
      data: patient,
      error: patientError
    } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single();

    if (patientError) {
      throw new Error(
        `Failed to fetch patient: ${patientError.message}`
      );
    }

    console.log(
      "Selected User:",
      user.name
    );

    console.log(
      "Selected Patient:",
      patient.name
    );

    const { data: nodes, error } =
      await supabase
        .from("candidate_nodes")
        .select("*");

    if (error) {
      throw new Error(
        `Failed to fetch candidate nodes: ${error.message}`
      );
    }

    console.log(
      `Loaded ${nodes.length} candidate nodes`
    );

    const result = compose({
      nodes,
      user,
      patient,
      budget
    });

    return res.status(200).json(result);

  } catch (error) {
    console.error(
      "Composition Error:",
      error
    );

    return res.status(500).json({
      message: error.message
    });
  }
}