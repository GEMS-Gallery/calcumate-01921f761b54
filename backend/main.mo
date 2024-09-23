import Float "mo:base/Float";

actor Calculator {
    // Addition function
    public query func add(x : Float, y : Float) : async Float {
        return x + y;
    };

    // Subtraction function
    public query func subtract(x : Float, y : Float) : async Float {
        return x - y;
    };

    // Multiplication function
    public query func multiply(x : Float, y : Float) : async Float {
        return x * y;
    };

    // Division function
    public query func divide(x : Float, y : Float) : async ?Float {
        if (y == 0) {
            return null; // Return null for division by zero
        } else {
            return ?(x / y);
        };
    };
};
