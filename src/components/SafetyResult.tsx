
import { ContentCheckResult } from "@/services/apiService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle } from "lucide-react";

interface SafetyResultProps {
  result: ContentCheckResult;
}

const SafetyResult = ({ result }: SafetyResultProps) => {
  const { isSafe, categories, transcript } = result;

  const getCategoryCount = () => {
    if (!categories) return 0;
    return Object.values(categories).filter(Boolean).length;
  };

  const getResultClasses = () => {
    return isSafe
      ? "bg-gradient-to-r from-green-50 to-green-100 border-safe text-safe shadow-lg"
      : "bg-gradient-to-r from-red-50 to-red-100 border-unsafe text-unsafe shadow-lg";
  };

  const getStatusIcon = () => {
    return isSafe ? (
      <CheckCircle className="h-8 w-8 text-safe" />
    ) : (
      <XCircle className="h-8 w-8 text-unsafe" />
    );
  };

  return (
    <Card className={`w-full max-w-2xl border-2 ${getResultClasses()} rounded-xl`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            {getStatusIcon()}
            {isSafe ? "SAFE" : "NOT SAFE"}
          </CardTitle>
          {!isSafe && categories && (
            <Badge variant="outline" className="text-unsafe border-unsafe px-4 py-1.5 font-medium text-xs rounded-full">
              {getCategoryCount()} issue{getCategoryCount() !== 1 ? "s" : ""} detected
            </Badge>
          )}
        </div>
        <CardDescription className={isSafe ? "text-green-700 text-base mt-1" : "text-red-700 text-base mt-1"}>
          {isSafe
            ? "This content appears to be safe for children."
            : "This content may contain potentially sensitive material."}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {!isSafe && categories && (
          <div className="mt-4 space-y-3">
            <h3 className="text-sm font-medium">Issues Detected:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(categories).map(
                ([key, value]) =>
                  value && (
                    <Badge
                      key={key}
                      variant="outline"
                      className="justify-start border-unsafe text-unsafe py-1.5 rounded-full"
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </Badge>
                  )
              )}
            </div>
          </div>
        )}
        
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="transcript" className="border-b-0">
            <AccordionTrigger className="font-medium">View Transcript</AccordionTrigger>
            <AccordionContent>
              <div className="max-h-60 overflow-y-auto bg-white/80 rounded-xl p-4 text-sm border border-gray-200 shadow-inner">
                {transcript}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SafetyResult;
