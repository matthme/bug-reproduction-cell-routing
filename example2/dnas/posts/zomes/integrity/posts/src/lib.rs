use hdi::prelude::*;

/// Validation you perform during the genesis process. Nobody else on the network performs it, only you.
/// There *is no* access to network calls in this callback
#[hdk_extern]
pub fn genesis_self_check(_data: GenesisSelfCheckData) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}

/// Validation the network performs when you try to join, you can't perform this validation yourself as you are not a member yet.
/// There *is* access to network calls in this function
pub fn validate_agent_joining(
    _agent_pub_key: AgentPubKey,
    _membrane_proof: &Option<MembraneProof>,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}

/// This is the unified validation callback for all entries and link types in this integrity zome
/// Below is a match template for all of the variants of `DHT Ops` and entry and link types
///
/// Holochain has already performed the following validation for you:
/// - The action signature matches on the hash of its content and is signed by its author
/// - The previous action exists, has a lower timestamp than the new action, and incremented sequence number
/// - The previous action author is the same as the new action author
/// - The timestamp of each action is after the DNA's origin time
/// - AgentActivity authorities check that the agent hasn't forked their chain
/// - The entry hash in the action matches the entry content
/// - The entry type in the action matches the entry content
/// - The entry size doesn't exceed the maximum entry size (currently 4MB)
/// - Private entry types are not included in the Op content, and public entry types are
/// - If the `Op` is an update or a delete, the original action exists and is a `Create` or `Update` action
/// - If the `Op` is an update, the original entry exists and is of the same type as the new one
/// - If the `Op` is a delete link, the original action exists and is a `CreateLink` action
/// - Link tags don't exceed the maximum tag size (currently 1KB)
/// - Countersigned entries include an action from each required signer
///
/// You can read more about validation here: https://docs.rs/hdi/latest/hdi/index.html#data-validation
#[hdk_extern]
pub fn validate(_op: Op) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
