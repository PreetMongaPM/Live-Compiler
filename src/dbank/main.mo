import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();  // Initialize start time with current time

  Debug.print(debug_show(currentValue));
  Debug.print(debug_show(startTime));

  let id = 2348923840928349;

  // Function to top up the balance
  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  // Function to withdraw amount from the balance
  public func withdraw(amount: Float) {
    let tempValue: Float = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Amount too large, currentValue less than zero.");
    }
  };

  // Function to check current balance
  public query func checkBalance(): async Float {
    return currentValue;
  };

  // Function to calculate compound interest on a monthly basis
  public func compound() {
    let currentTime = Time.now();  // Get current time
    let timeElapsedNS = currentTime - startTime;  // Calculate time elapsed in nanoseconds
    
    // Convert time elapsed from nanoseconds to months
    let timeElapsedMonths = Float.fromInt(timeElapsedNS / (30 * 24 * 60 * 60 * 1000000000));
    
    // Apply compound interest formula with interest rate (e.g., 1% per month)
    currentValue := currentValue * (1.01 ** timeElapsedMonths);
    
    // Update start time to current time for next calculation
    startTime := currentTime;

    // Debug print to show updated balance and elapsed months
    Debug.print("Updated Balance: " # debug_show(currentValue));
    Debug.print("Time Elapsed in Months: " # debug_show(timeElapsedMonths));
  };
}
