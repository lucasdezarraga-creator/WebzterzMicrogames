#include <emscripten/emscripten.h>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int addNum(int a, int b){
        return a + b;
    }
}